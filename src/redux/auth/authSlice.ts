// src/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { auth, createRecaptchaVerifier, db } from '../../firebase/firebase'; // Assuming you have firebase configured in firebase.ts
import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, ConfirmationResult, signInWithPhoneNumber } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  name: string;
  phoneNumber: string;
  address: {
    Address: string;
    city: string;
    state: string;
    Pincode: string;
    country: string;
  };
  email: string;
  isProfileComplete: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  confirmationResult: ConfirmationResult | null;
  userProfile: UserProfile | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  confirmationResult: null,
  userProfile: null,
};

// Type annotations for async thunk arguments
interface AuthCredentials {
  email: string;
  password: string;
}

interface UpdateProfilePayload {
  uid: string;
  profile: UserProfile;
}

export const updateProfile = createAsyncThunk<void, UpdateProfilePayload, { rejectValue: string }>(
  'auth/updateProfile',
  async ({ uid, profile }, { rejectWithValue }) => {
    try {
      await setDoc(doc(db, 'users', uid), profile);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserProfile = createAsyncThunk<UserProfile, string, { rejectValue: string }>(
  'auth/fetchUserProfile',
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      } else {
        // Handle the case where the user does not have a profile yet
        return rejectWithValue('No profile found');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing in with email and password
export const signInWithEmail = createAsyncThunk<User, AuthCredentials, { rejectValue: string }>(
  'auth/signInWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signing up with email and password
export const signUpWithEmail = createAsyncThunk<User, AuthCredentials, { rejectValue: string }>(
  'auth/signUpWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const newUserProfile = {
        uid: user.uid,
        email: user.email,
        name: '',
        address: { Address: '', city: '', state: '', Pincode: '', country: '' },
        phoneNumber: '',
        isProfileComplete: false
      };

      await setDoc(doc(db, 'users', user.uid), newUserProfile);

      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleSignIn = createAsyncThunk<User, void, {rejectValue: string}>(
    'auth/googleSignIn',
    async (_, { rejectWithValue }) => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userProfileRef = doc(db, 'users', user.uid);
        const userProfileSnap = await getDoc(userProfileRef);

      // If profile doesn't exist, create it
      if (!userProfileSnap.exists()) {
        const newUserProfile = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          address: { Address: '', city: '', state: '', Pincode: '', country: '' },
          phoneNumber: user.phoneNumber,
          isProfileComplete: false  
        };
        await setDoc(userProfileRef, newUserProfile);
      }

        return result.user;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const sendOtp = createAsyncThunk<ConfirmationResult, string, { rejectValue: string }>(
    'auth/sendOtp',
    async (phoneNumber, { rejectWithValue }) => {
      try {
        const appVerifier = createRecaptchaVerifier();
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        return confirmationResult;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const verifyOtp = createAsyncThunk<User, { confirmationResult: ConfirmationResult, otp: string }, { rejectValue: string }>(
    'auth/verifyOtp',
    async ({ confirmationResult, otp }, { rejectWithValue }) => {
      try {
        const result = await confirmationResult.confirm(otp);
        const user = result.user;

        const userProfileRef = doc(db, 'users', user.uid);
        const userProfileSnap = await getDoc(userProfileRef);

        if (!userProfileSnap.exists()) {
          const newUserProfile = {
            uid: user.uid,
            email: user.email,  // May not always be available for OTP
            name: '',
            address: { Address: '', city: '', state: '', Pincode: '', country: '' },
            phoneNumber: user.phoneNumber,
            isProfileComplete: false
          };
          await setDoc(userProfileRef, newUserProfile);
        }

        return user;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  

// Async thunk for signing out
export const signOut = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearMessage: (state) => {
        state.successMessage = null;
        state.error = null;
    }, 
    setConfirmationResult: (state, action: PayloadAction<ConfirmationResult | null>) => {
      state.confirmationResult = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.userProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithEmail.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInWithEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signUpWithEmail.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.successMessage = 'User created successfully';
      })
      .addCase(signUpWithEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        googleSignIn.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleSignIn.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.confirmationResult = null;
      })
      .addCase(signOut.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action: PayloadAction<ConfirmationResult>) => {
        state.loading = false;
        state.confirmationResult = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.meta.arg.profile;
      })
      .addCase(updateProfile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMessage, setUser, clearUser, setConfirmationResult } = authSlice.actions;
export default authSlice.reducer;

// src/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { auth, createRecaptchaVerifier } from '../../firebase/firebase'; // Assuming you have firebase configured in firebase.ts
import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, ConfirmationResult, signInWithPhoneNumber } from 'firebase/auth';


export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  confirmationResult: ConfirmationResult | null;

}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  confirmationResult: null,

};

// Type annotations for async thunk arguments
interface AuthCredentials {
  email: string;
  password: string;
}

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
      return userCredential.user;
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
        return result.user;
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
    }
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
      });
  },
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;

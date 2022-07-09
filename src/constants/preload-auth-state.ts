export const preloadedAuthState = {
  nick: '',
  email: '',
  isAuthenticated:false,
  isUserDataLoading: false,
  isAuthChecked: false,
  passwordRecoverStatus: {
    success: false,
  } as {success: boolean} | null,
  showPasswordResetNotification: false,
  passwordResetStatus: {
    success: false,
  } as {success: boolean} | null,
  showPasswordRecoverNotification: false,
}

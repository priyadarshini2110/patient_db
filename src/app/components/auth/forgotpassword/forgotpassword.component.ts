import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  step = 1; // Step 1 = Enter Email, Step 2 = Verify OTP, Step 3 = Reset Password
  timeLeft: number = 90; // 1 minute 30 seconds
  timer: any;
  otpSentMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.startTimer();
  }
  

  // Step 1: Send OTP
  sendOtp() {
    if (!this.email) {
      this.message = 'Email is required!';
      return;
    }
  
    this.authService.sendOtp(this.email).subscribe({
      next: (response) => {
        console.log('OTP sent response:', response);
        this.message = response.message || 'OTP sent successfully';
        alert(this.message);
        if (response.message.includes('OTP sent successfully')) {
          this.step = 2; // ✅ Move to OTP step
          this.showOtpSentMessage(); // ✅ Show OTP alert
        }
      },
      error: (error) => {
        console.error('Error sending OTP:', error);
        this.message = error.error?.message || 'Failed to send OTP. Please try again.';
      }
    });
  }
  
  showOtpSentMessage() {
    this.otpSentMessage = `OTP has been sent to ${this.maskEmail(this.email)}`;
    setTimeout(() => {
      this.otpSentMessage = ''; // ✅ Hide the message after 5 seconds
    }, 5000);
  }
  
  maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    const maskedName = name.slice(0, 3) + '*****';
    return `${maskedName}@${domain}`;
  }

  startTimer() {
    this.timeLeft = 90; // 1 minute 30 seconds
    const endTime = Date.now() + this.timeLeft * 1000;
  
    if (this.timer) {
      clearInterval(this.timer);
    }
  
    this.timer = setInterval(() => {
      const remainingTime = Math.floor((endTime - Date.now()) / 1000);
      if (remainingTime >= 0) {
        this.timeLeft = remainingTime;
      } else {
        clearInterval(this.timer);
        this.timeLeft = 0;
      }
    }, 100);
  }
  
  
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  resendOtp() {
    this.authService.sendOtp(this.email).subscribe({
      next: (response) => {
        console.log('OTP resent response:', response);
        this.message = 'OTP resent successfully!';
        this.startTimer(); // Restart the timer after resending OTP
      },
      error: (error) => {
        console.error('Error resending OTP:', error);
        this.message = error.error || 'Failed to resend OTP.';
      }
    });
  }
  
  cancel() {
    this.step = 1; // Go back to the previous step
    this.clearForm();
  }
  
  verifyOtp() {
    if (!this.otp) {
      this.message = 'OTP is required!';
      return;
    }
  
    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: (response) => {
        console.log('OTP verification response:', response);
        this.message = response || 'OTP verified successfully!';
        if (response.includes('OTP verified successfully')) {
          this.step = 3; // Proceed to next step after successful OTP verification
        }
      },
      error: (error) => {
        console.error('Error verifying OTP:', error);
        this.message = error.error || 'Invalid OTP. Please try again.';
      }
    });
  }
  
  // Step 3: Reset Password
  resetPassword() {
    if (!this.newPassword || !this.confirmPassword) {
      this.message = 'All fields are required!';
      alert(this.message);
      return;
    }
  
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Passwords do not match!';
      alert(this.message);
      return;
    }
  
    this.authService.resetPassword(this.email, this.newPassword).subscribe({
      next: (response) => {
        console.log('Password reset response:', response);
        // Directly handle the response string
        this.message = response || 'Password reset successful!';
        alert(this.message);
        if (response.includes('Password reset successful')) {
          this.step = 1; // ✅ Reset the flow after successful reset
          this.clearForm();
          setTimeout(() => {
            this.router.navigate(['/login']); // ✅ Redirect to login page after reset
          }, 1000);
        }
      },
      error: (error) => {
        console.error('Error resetting password:', error);
        this.message = error.error || 'Failed to reset password. Please try again.';
        alert(this.message);
      }
    });
  }
  
  

  // Helper to clear form fields
  private clearForm() {
    this.email = '';
    this.otp = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.message = '';
  }
}
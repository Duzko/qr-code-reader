import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/common/Header';

export default function LoginPage() {
  return (
    <div>
        <head>
            <title>Đăng nhập</title>
            <meta name="description" content="Đăng nhập vào tài khoản của bạn" />
            <link rel="icon" href="/favicon.ico" />  
        </head>
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <LoginForm />
        </div>
    </div>
  );
}

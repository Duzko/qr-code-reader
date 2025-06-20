import RegisterForm from '@/components/auth/RegisterForm';
import Header from '@/components/common/Header';

export default function RegisterPage() {
  return (
    <div>
        <head>
            <title>Đăng ký</title>
            <meta name="description" content="Tạo tài khoản mới" />
            <link rel="icon" href="/favicon.ico" />
        </head>
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <RegisterForm />
        </div>
    </div>
  );
}
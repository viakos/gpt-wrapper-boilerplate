import LoginButton from '@/components/auth/LoginButton';

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome to the GPT Wrapper Boilerplate</h1>
        <LoginButton />
      </div>
    </div>
  );
}

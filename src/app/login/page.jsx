import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl text-center my-8 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-bold">Login</h1>
      <section className="container mx-auto">

        {/* Right Section */}
        <div className="flex justify-center items-center">
          <LoginForm />
        </div>
      </section>
    </>
  );
}
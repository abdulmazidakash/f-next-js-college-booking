//app/login/page.jsx
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <section className="container mx-auto my-8">

        {/* Right Section */}
        <div className="flex justify-center items-center">
          <LoginForm />
        </div>
      </section>
    </>
  );
}
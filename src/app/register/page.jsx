// import Image from "next/image";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl text-center my-8 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-bold">Register</h1>
      <section className="container mx-auto">

        {/* Right Section */}
        <div className="flex justify-center items-center">
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
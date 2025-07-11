// import Image from "next/image";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
   
      <section className="container mx-auto">

        {/* Right Section */}
        <div className="flex justify-center items-center">
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
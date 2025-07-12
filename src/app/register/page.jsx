// import Image from "next/image";
import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  return (
    <>
   
      <section className="container mx-auto my-8">

        {/* Right Section */}
        
        <div className="flex justify-center items-center">
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
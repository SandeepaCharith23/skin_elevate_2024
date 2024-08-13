import Link from "next/link";
import Image from "next/image";
import React from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

const MainDashBoardPage = async () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[90%]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Logo image"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          {/* <RegisterForm user={undefined}></RegisterForm> */}
          <RegisterForm></RegisterForm>

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024- SKIN ELEVATE
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src={"/assets/images/register-img.png"}
        alt={""}
        width={1000}
        height={2000}
        className="side-img max-w-[30%] h-screen object-cover"
      />
    </div>
  );
};

export default MainDashBoardPage;

import { doSocialLogin } from "@/app/actions";
import Image from "next/image";

const SocialLogins = ({t}) => {
  return (
    <form className="w-full px-4" action={doSocialLogin}>
      <button
        className="flex items-center gap-2 bg-white w-full text-headingColor p-3 rounded-md border my-3 text-lg"
        type="submit"
        name="action"
        value="google"
      >
        <Image
          className="w-10 h-10"
          src="/images/png/google.png"
          width={1000}
          height={1000}
          alt="Logo"
        />{" "}
        <span>{t("registrationLogin.signInWithGoogleButton")}</span>
      </button>
    </form>
  );
};

export default SocialLogins;

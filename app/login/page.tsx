"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { EyeFilledIcon } from "@/components/eye_filled_icon";
import { EyeSlashFilledIcon } from "@/components/eye_slash_filled_icon";
import { login } from "@/types/auth"; // Import the login function

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const response = await login(credentials);

    if (response.ok) {
      router.push("/");
    } else {
      setErrorMessage(await response.text());
    }
  }

  return (
    <Card className="min-w-[400px] p-4" radius="sm">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <h4 className="text-large font-bold">Login</h4>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardBody className="gap-4">
          <Input
            isRequired
            classNames={{ label: "font-medium" }}
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Username"
            radius="sm"
            type="text"
            variant="bordered"
            onChange={handleChange}
          />
          <Input
            isRequired
            classNames={{ label: "font-medium" }}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            errorMessage={errorMessage}
            isInvalid={errorMessage !== ""}
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Password"
            radius="sm"
            type={isVisible ? "text" : "password"}
            variant="bordered"
            onChange={handleChange}
          />
          <Button className="w-full" radius="sm" type="submit" variant="flat">
            Login
          </Button>
        </CardBody>
      </form>
    </Card>
  );
}
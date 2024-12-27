"use client";
import { Input as AntInput } from "antd"; // Renamed to AntInput
import { InputProps } from "antd/lib/input";
import { PasswordProps } from "antd/lib/input/Password";
import { TextAreaProps } from "antd/lib/input/TextArea";
import { FC } from "react";

interface InputComponentBaseProps {
  icon?: FC<{ className?: string }>;
  placeholder?: string;
  className?: string;
  type?: string;
  rows?: number;
  isPassword?: boolean;
  isTextArea?: boolean;
}

type InputComponentProps = InputComponentBaseProps &
  (
    | (InputProps & { isPassword?: false; isTextArea?: false })
    | (PasswordProps & { isPassword: true; isTextArea?: false })
    | (TextAreaProps & { isTextArea: true; isPassword?: false })
  );

const InputComponent: FC<InputComponentProps> = ({
  icon: Icon,
  placeholder,
  className = "",
  type = "text",
  rows = 10,
  isPassword = false,
  isTextArea = false,
  ...rest
}) => {
  return (
    <div>
      {isTextArea ? (
        <AntInput.TextArea
          rows={rows}
          placeholder={placeholder || "Enter text"}
          className={`w-full border border-gray-200 px-4 py-3 text-[16px] bg-white text-gray-700 rounded-lg focus:border-primary ${className}`}
          {...(rest as TextAreaProps)}
        />
      ) : isPassword ? (
        <AntInput.Password
          prefix={Icon && <Icon className="text-gray-500 text-xl" />}
          placeholder={placeholder || "Enter password"}
          className={`w-full border border-gray-200 px-4 py-3 text-[16px] bg-white text-gray-700 rounded-lg focus:border-primary ${className}`}
          {...(rest as PasswordProps)}
        />
      ) : (
        <AntInput
          prefix={Icon && <Icon className="text-gray-500 text-xl" />}
          placeholder={placeholder || "Enter value"}
          className={`w-full border border-gray-200 px-4 py-3 text-[16px] bg-white text-gray-700 rounded-lg focus:border-primary ${className}`}
          type={type}
          {...(rest as InputProps)}
        />
      )}
    </div>
  );
};

export default InputComponent;

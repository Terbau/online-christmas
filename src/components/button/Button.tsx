import { ButtonHTMLAttributes, FC, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "red" | "green" | "white"
  onClick?: () => void
  className?: string
  children: ReactNode
}

export const Button: FC<ButtonProps> = ({ children, onClick, className, ...props }) => {
  const color = props.color || "blue"
  const colorStyles = {
    blue: "bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-600",
    red: "bg-red-400 text-white hover:bg-red-500 active:bg-red-600",
    green: "bg-green-400 text-white hover:bg-green-500 active:bg-green-600",
    white: "bg-white text-blue-400 hover:bg-gray-200 active:bg-gray-300",
  }

  return (
    <button className={`rounded-md px-4 py-2 ${className} ${colorStyles[color]}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

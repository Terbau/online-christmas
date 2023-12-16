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
    blue: "bg-blue-400 text-white hover:bg-blue-500",
    red: "bg-red-400 text-white hover:bg-red-500",
    green: "bg-green-400 text-white hover:bg-green-500",
    white: "bg-white text-blue-400 hover:bg-gray-200",
  }

  return (
    <button className={`rounded-md px-4 py-2 ${className} ${colorStyles[color]}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

import { ButtonHTMLAttributes, ReactNode } from "react"

interface BorderedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "red" | "green" | "white"
  onClick?: () => void
  className?: string
  children: ReactNode
}

export const BorderedButton = ({ children, onClick, className, ...props }: BorderedButtonProps) => {
  const color = props.color || "blue"
  const colorStyles = {
    blue: "border border-blue-400 text-blue-400 hover:border-blue-500 hover:text-blue-500",
    red: "border border-red-400 text-red-400 hover:border-red-500 hover:text-red-500",
    green: "border border-green-400 text-green-400 hover:border-green-500 hover:text-green-500",
    white: "border border-white text-white hover:border-gray-200 hover:text-gray-200",
  }

  return (
    <button className={`rounded-md px-4 py-2 ${className} ${colorStyles[color]}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

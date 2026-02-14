"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Calculator, FileText, User, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
    { name: "Home", href: "/", icon: Heart },
    { name: "PREVENT", href: "/calculators/prevent", icon: Calculator },
    { name: "KFRE", href: "/calculators/kfre", icon: Activity },
    { name: "Resultados", href: "/results", icon: FileText },
    { name: "Perfil", href: "/profile", icon: User },
]

export function Navigation() {
    const pathname = usePathname()

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <Link href="/" className="flex items-center">
                            <Heart className="h-8 w-8 text-blue-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                CardioRenal
                            </span>
                        </Link>
                        <div className="ml-10 flex space-x-8">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors",
                                            isActive
                                                ? "border-blue-600 text-gray-900"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                        )}
                                    >
                                        <Icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpCircle,
  User,
  Link as LinkIcon,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

export const QuickActions = () => {
  const actions = [
    {
      label: "Withdraw",
      icon: <ArrowUpCircle className="w-6 h-6" />,
      url: "/dashboard/withdraw",
      color: "bg-red-100 text-red-600",
    },
    {
      label: "My Account",
      icon: <User className="w-6 h-6" />,
      url: "/dashboard/account",
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "My Link",
      icon: <LinkIcon className="w-6 h-6" />,
      url: "/dashboard/link",
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Transactions",
      icon: <CreditCard className="w-6 h-6" />,
      url: "/dashboard/transactions",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <section className="my-6">
      <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link href={action.url} key={action.label}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center justify-center space-y-2 py-6">
                <div
                  className={`flex items-center justify-center rounded-full p-3 ${action.color}`}
                >
                  {action.icon}
                </div>
                <span className="font-medium">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

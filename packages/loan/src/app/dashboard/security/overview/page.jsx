"use client";

import { useSecurityOverview } from "@/hooks";
import Link from "next/link";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Treemap,
} from "recharts";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const KPI_COLORS = ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-red-100", "bg-purple-100", "bg-gray-100"];

function Card({ title, children, className }) {
  return (
    <div className={`shadow-md rounded-lg p-4 border ${className}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default function Overview() {
  const {
    rolesByUser,
    permissionsByRoles,
    usersByMonth,
    agentsCount,
    officersCount,
    usersCount,
    rolesCount,
    permissionsCount,
    groupsCount,
  } = useSecurityOverview();

  const data = {
    totalUsers: { count: usersCount?.data?.item?.count || '', url: "/dashboard/security/users" },
    activeOfficers: { count: officersCount?.data?.item?.count || '', url: "/dashboard/security/officers" },
    activeAgents: { count: agentsCount?.data?.item?.count || '', url: "/dashboard/security/agents" },
    rolesCount: { count: rolesCount?.data?.item?.count || '', url: "/dashboard/security/roles" },
    permissionsCount: { count: permissionsCount?.data?.item?.count || '', url: "/dashboard/security/permissions" },
    groupsCount: { count: groupsCount?.data?.item?.count || '', url: "/dashboard/security/groups" },
  };
  
  return (
    <div className="grid gap-4 p-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, { count, url }], index) => (
          <Link key={key} href={url} className="block">
            <Card 
              title={key.replace(/([A-Z])/g, " $1").trim().replace(/^./, str => str.toUpperCase())} 
              className={KPI_COLORS[index % KPI_COLORS.length]}
            >
              <p className="text-2xl font-bold">{count}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card title="Users by Role">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rolesByUser?.data?.item || []}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#0088FE" animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Users by Role">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={rolesByUser?.data?.item || []} dataKey="users" nameKey="name" outerRadius={100}>
                {rolesByUser?.data?.item?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="User Registrations Over Time">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={usersByMonth?.data?.item || []}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#FF8042" strokeWidth={2} animationDuration={800} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Permissions Distribution">
          <ResponsiveContainer width="100%" height={600}>
            <BarChart data={permissionsByRoles?.data?.item || []} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={200} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>


      </div>
    </div>
  );
}

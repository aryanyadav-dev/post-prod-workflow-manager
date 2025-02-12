"use client";

import React from "react";
import { Users, Clock, Files, FolderOpen } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion"; 
const Card = ({ children, className }) => (
  <motion.div
    className={`rounded-lg shadow-md p-4 w-full ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ children, className }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>
);

const CardContent = ({ children, className }) => (
  <div className={`w-full ${className}`}>{children}</div>
);

const Badge = ({ children, className }) => (
  <span
    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${className}`}
  >
    {children}
  </span>
);

const Table = ({ children }) => (
  <div className="overflow-x-auto w-full">
    <table className="min-w-full divide-y divide-gray-700">{children}</table>
  </div>
);

const TableHeader = ({ children }) => (
  <thead className="bg-gray-800">{children}</thead>
);

const TableRow = ({ children, className }) => (
  <motion.tr
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.tr>
);

const TableHead = ({ children, className }) => (
  <th
    className={`px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

const TableBody = ({ children }) => <tbody>{children}</tbody>;

const TableCell = ({ children, className }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
);

const Progress = ({ value, className, indicatorClassName }) => (
  <div className={`w-full bg-gray-700 rounded ${className}`}>
    <motion.div
      className={`h-2 rounded ${indicatorClassName}`}
      style={{ width: `${value}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1 }}
    ></motion.div>
  </div>
);

const ScrollableContainer = ({ children }) => (
  <div className="h-[calc(100vh-80px)] overflow-y-auto w-full custom-scrollbar">
    <style jsx global>{`
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #4B5563 #1F2937;
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 12px;
      }

      .custom-scrollbar::-webkit-scrollbar-track {
        background: #1F2937;
        border-radius: 6px;
        margin: 2px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #4B5563;
        border-radius: 6px;
        border: 3px solid #1F2937;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #6B7280;
      }

      .custom-scrollbar::-webkit-scrollbar-corner {
        background: transparent;
      }
    `}</style>
    {children}
  </div>
);

const progressData = [
  { week: "Week 1", completed: 65, new: 72 },
  { week: "Week 2", completed: 82, new: 85 },
  { week: "Week 3", completed: 90, new: 78 },
  { week: "Week 4", completed: 85, new: 92 },
];

const resources = [
  { name: "Video Editing", percentage: 85 },
  { name: "Sound Design", percentage: 65 },
  { name: "Color Grading", percentage: 45 },
  { name: "Motion Graphics", percentage: 72 },
];

const recentFiles = [
  {
    name: "Project_A_Final_Cut_v2.prproj",
    type: "Premiere Pro",
    status: "In Review",
    lastModified: "2 hours ago",
  },
  {
    name: "Sound_Mix_Project_B.aep",
    type: "After Effects",
    status: "Completed",
    lastModified: "5 hours ago",
  },
  {
    name: "Color_Grade_Scene_1.drp",
    type: "DaVinci",
    status: "In Progress",
    lastModified: "1 day ago",
  },
  {
    name: "VFX_Sequence_Final.blend",
    type: "Blender",
    status: "Pending",
    lastModified: "2 days ago",
  },
];

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 w-full">
      <div className="flex w-full">
        <div className="flex-1 w-full">
          <ScrollableContainer>
            <div className="p-6 w-full">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">
                  Overview of your post-production workflow
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
                {[
                  {
                    title: "Active Projects",
                    value: 24,
                    icon: FolderOpen,
                    trend: "+2 from last month",
                    trendColor: "text-green-500",
                  },
                  {
                    title: "Pending Tasks",
                    value: 145,
                    icon: Clock,
                    trend: "12 due today",
                    trendColor: "text-gray-400",
                  },
                  {
                    title: "Active Editors",
                    value: 8,
                    icon: Users,
                    trend: "3 currently online",
                    trendColor: "text-gray-400",
                  },
                  {
                    title: "Files Tracked",
                    value: 578,
                    icon: Files,
                    trend: "+42 this week",
                    trendColor: "text-green-500",
                  },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-gray-800 p-6 rounded-lg w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium text-gray-400">
                        {stat.title}
                      </h3>
                      <stat.icon className="text-gray-400" size={20} />
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className={`text-sm ${stat.trendColor}`}>{stat.trend}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg w-full">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Project Progress
                  </h2>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={progressData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                          dataKey="week"
                          stroke="#9CA3AF"
                          tick={{ fill: "#9CA3AF" }}
                        />
                        <YAxis
                          stroke="#9CA3AF"
                          tick={{ fill: "#9CA3AF" }}
                          domain={[0, 100]}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1F2937",
                            border: "none",
                            borderRadius: "0.375rem",
                            color: "#fff",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="#10B981"
                          strokeWidth={2}
                          dot={{ fill: "#10B981", strokeWidth: 2 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="new"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg w-full">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Resource Allocation
                  </h2>
                  <div className="space-y-4">
                    {resources.map((resource, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-400">
                            {resource.name}
                          </span>
                          <span className="text-sm text-gray-400">
                            {resource.percentage}%
                          </span>
                        </div>
                        <Progress
                          value={resource.percentage}
                          indicatorClassName="bg-blue-500"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <Card className="bg-gray-800 mt-4 w-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">
                    Recent Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Modified</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentFiles.map((file) => (
                        <TableRow key={file.name}>
                          <TableCell className="font-medium text-gray-300">
                            {file.name}
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {file.type}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                file.status === "Completed"
                                  ? "bg-green-500/10 text-green-500"
                                  : file.status === "In Progress"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : file.status === "In Review"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-gray-500/10 text-gray-500"
                              }
                            >
                              {file.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {file.lastModified}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </ScrollableContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

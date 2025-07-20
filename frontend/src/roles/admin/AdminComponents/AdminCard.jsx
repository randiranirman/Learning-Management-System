import React from "react";
import { Card } from "antd";

const AdminCard = ({ title, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 min-h-[160px]"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default AdminCard;

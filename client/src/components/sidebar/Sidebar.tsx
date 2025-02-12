import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Users,
  FileText,
  Calendar,
  BarChart2,
  FileVideo,
  Bell,
  Settings,
  MoreVertical,
  LayoutDashboard,
  ChevronLast,
  LogOut,
  Inbox,
  Film,
  MessageCircle
} from 'lucide-react';

interface SidebarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onPageChange, currentPage }) => {
  const [activeItem, setActiveItem] = useState(currentPage);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'Workflow': false,
    'Settings': false
  });
  const [expanded, setExpanded] = useState(true);

  const handleItemClick = (text: string) => {
    const normalizedText = text === 'Schedules'
        ? 'schedule'
        : text === 'Kanban Board'
            ? 'team'
            : text === 'File Dropbox'
                ? 'dropbox'
                : text === 'Storyboarder'
                    ? 'storyboarder'
                    : text === 'Project Chatroom'
                        ? 'chatroom'
                        : text.toLowerCase().replace(' ', '-');

    setActiveItem(normalizedText);
    onPageChange(normalizedText);
  };

  const toggleExpand = (item: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const menuItems = [
    { icon: LayoutDashboard, text: 'Dashboard' },
    { icon: Users, text: 'Kanban Board' },
    { icon: FileText, text: 'Notes' },
    { icon: Calendar, text: 'Schedules' },
    {
      icon: BarChart2,
      text: 'Workflow',
      submenu: [
        'By task',
        'By codec',
        'By date added',
        'By priority'
      ]
    },
    { icon: FileVideo, text: 'Screenwriting' },
    { icon: Inbox, text: 'File Dropbox' },
    { icon: Film, text: 'Storyboarder' },
    { icon: MessageCircle, text: 'Project Chatroom' },
  ];

  const bottomItems = [
    { icon: Bell, text: 'Notification' },
    { icon: Settings, text: 'Settings' }
  ];

  return (
      <div className={`relative flex flex-col h-screen bg-gray-900 text-gray-400 transition-all duration-300 rounded-r-lg
          ${expanded ? 'w-56' : 'w-16'}`}>
        {/* Collapse Button */}
        <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-16 bg-gray-800 rounded-full p-1.5
              transform transition-transform hover:bg-gray-700"
            style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}
        >
          <ChevronLast size={16} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <img
                src="/Group 1.svg"
                alt="Sequence Logo"
                width="24"
                height="24"
                className="text-gray-300"
            />
            {expanded && <span className="text-white font-semibold">SEQUENCE</span>}
          </div>
          <MoreVertical size={20} className="text-gray-400" />
        </div>

        {/* User section */}
        <div className="p-4 border-b border-gray-800">
          <div className="text-sm text-gray-500">{expanded ? '<USERNAME>' : ''}</div>
        </div>

        {/* Main navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-2">
            {menuItems.map((item) => (
                <div key={item.text}>
                  <button
                      onClick={() => item.submenu ? toggleExpand(item.text) : handleItemClick(item.text)}
                      className={`w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md
                      ${activeItem === (
                          item.text === 'Schedules' ? 'schedule' :
                              item.text === 'Kanban Board' ? 'team' :
                                  item.text === 'File Dropbox' ? 'dropbox' :
                                      item.text === 'Storyboarder' ? 'storyboarder' :
                                          item.text === 'Project Chatroom' ? 'chatroom' :
                                              item.text.toLowerCase().replace(' ', '-')
                      ) ? 'bg-gray-800 text-white' : ''}
                      ${item.submenu ? 'justify-between' : ''}
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon size={20} />
                      {expanded && (
                          <span className="ml-3 text-base">{item.text}</span>
                      )}
                    </div>
                    {expanded && item.submenu && (
                        <div className="ml-auto">
                          {expandedItems[item.text] ?
                              <ChevronDown size={16} /> :
                              <ChevronRight size={16} />
                          }
                        </div>
                    )}
                  </button>
                  {expanded && item.submenu && expandedItems[item.text] && (
                      <div className="pl-4 bg-gray-800/50 rounded-md">
                        {item.submenu.map((subItem) => (
                            <button
                                key={subItem}
                                onClick={() => handleItemClick(subItem)}
                                className={`w-full text-left py-2 px-4 hover:bg-gray-800 text-base rounded-md
                            ${activeItem === subItem.toLowerCase().replace(' ', '-') ? 'bg-gray-700 text-white' : ''}`}
                            >
                              {subItem}
                            </button>
                        ))}
                      </div>
                  )}
                </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800">
          <div className="px-2 py-2">
            {expanded && <span className="text-gray-500 text-xs px-2">SETTINGS</span>}
            {bottomItems.map((item) => (
                <button
                    key={item.text}
                    onClick={() => handleItemClick(item.text.toLowerCase())}
                    className="w-full flex items-center px-4 py-2 hover:bg-gray-800 rounded-md"
                >
                  <item.icon size={20} />
                  {expanded && <span className="ml-3 text-base">{item.text}</span>}
                </button>
            ))}
          </div>
          <div className="p-4">
            <button
                onClick={() => handleItemClick('logout')}
                className={`w-full flex items-center justify-center py-2 px-4 bg-gray-800 rounded-md
                  hover:bg-gray-700 transition-colors ${expanded ? '' : 'justify-center'}`}
            >
              <LogOut size={20} />
              {expanded && <span className="ml-3 text-base">Log Out</span>}
            </button>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;

import { Shield, ShieldAlert, Trash2, Mail, User as UserIcon } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';

export const UserManagement = () => {
  const { data: users, isLoading, deleteUser } = useUsers();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      await deleteUser(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">Control system access levels and user accounts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-10 text-gray-400">Loading users...</div>
        ) : users?.map((user) => (
          <div key={user.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                user.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
              }`}>
                {user.role === 'admin' ? <Shield size={24} /> : <UserIcon size={24} />}
              </div>
              <button 
                onClick={() => handleDelete(user.id)}
                className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-gray-900">{user.first_name} {user.last_name}</h3>
            <p className="text-sm text-gray-500 mb-4">@{user.username}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} className="text-gray-400" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-sm">
                {user.role === 'admin' ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                    <ShieldAlert size={14} />
                    Administrator
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <UserIcon size={14} />
                    Standard User
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

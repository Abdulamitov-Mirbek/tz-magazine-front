import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useOrders } from '../hooks/useOrders';
import { useUsers } from '../hooks/useUsers';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={20} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trendValue}%
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
    </div>
  </div>
);

export const DashboardOverview = () => {
  const { data: products } = useProducts();
  const { data: orders } = useOrders();
  const { data: users } = useUsers();

  const totalRevenue = orders?.results?.reduce((sum, order) => sum + Number(order.total_price), 0) || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
        <p className="text-sm text-gray-500 mt-1">С возвращением! Вот что происходит сегодня.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Всего товаров" 
          value={products?.count || 0} 
          icon={Package} 
          trend="up" 
          trendValue="12" 
        />
        <StatCard 
          title="Всего заказов" 
          value={orders?.count || 0} 
          icon={ShoppingCart} 
          trend="up" 
          trendValue="8" 
        />
        <StatCard 
          title="Всего пользователей" 
          value={users?.length || 0} 
          icon={Users} 
          trend="up" 
          trendValue="5" 
        />
        <StatCard 
          title="Доход" 
          value={`$${totalRevenue.toLocaleString()}`}
          icon={TrendingUp} 
          trend={totalRevenue > 0 ? 'up' : 'down'}
          trendValue={totalRevenue > 0 ? '100' : '0'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Недавние заказы</h3>
          <div className="space-y-4">
            {!orders?.results || orders.results.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">Заказов пока нет</p>
            ) : (
              orders.results.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <ShoppingCart size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Заказ #{order.id} — {order.user.first_name} {order.user.last_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="ml-auto text-sm font-bold text-gray-900">+${Number(order.total_price).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Быстрые действия</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-100 rounded-xl text-left hover:bg-gray-50 transition-colors">
              <Package size={20} className="text-primary mb-2" />
              <p className="text-sm font-bold text-gray-900">Добавить товар</p>
              <p className="text-xs text-gray-500">Создать новую позицию</p>
            </button>
            <button className="p-4 border border-gray-100 rounded-xl text-left hover:bg-gray-50 transition-colors">
              <Users size={20} className="text-primary mb-2" />
              <p className="text-sm font-bold text-gray-900">Пригласить</p>
              <p className="text-xs text-gray-500">Добавить сотрудника</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
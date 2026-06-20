import { 
  Clock,
  CheckCircle2,
  XCircle,
  MoreHorizontal
} from 'lucide-react';
import { useOrders } from '../hooks/useOrders';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
    shipped: 'bg-green-50 text-green-700 border-green-100',
    cancelled: 'bg-red-50 text-red-700 border-red-100',
  };

  const icons: Record<string, any> = {
    pending: Clock,
    shipped: CheckCircle2,
    cancelled: XCircle,
  };

  const Icon = icons[status] || Clock;

  const labels: Record<string, string> = {
    pending: 'В ожидании',
    shipped: 'Отправлен',
    cancelled: 'Отменен',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <Icon size={12} />
      {labels[status] || status}
    </span>
  );
};

export const OrderManagement = () => {
  const { data, isLoading, updateStatus } = useOrders();

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await updateStatus({ id, status });
    } catch (err) {
      alert('Не удалось обновить статус');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Заказы</h1>
        <p className="text-sm text-gray-500 mt-1">Отслеживайте и управляйте заказами клиентов.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>ID заказа</th>
                <th>Клиент</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th className="text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-400">Загрузка заказов...</td>
                </tr>
              ) : !data?.results ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-red-400">Не удалось загрузить заказы. Попробуйте позже.</td>
                </tr>
              ) : data.results.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium text-gray-900">#ORD-{order.id}</td>
                  <td>
                    <div>
                      <p className="font-medium text-gray-900">{order.user.first_name} {order.user.last_name}</p>
                      <p className="text-xs text-gray-500">{order.user.email}</p>
                    </div>
                  </td>
                  <td className="text-gray-600">
                    {new Date(order.created_at).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="font-medium text-gray-900">${order.total_price}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {order.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(order.id, 'shipped')}
                            className="text-xs font-semibold text-green-600 hover:text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            Отметить отправленным
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                            className="text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Отменить
                          </button>
                        </>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
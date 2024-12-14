import { type TooltipProps } from 'recharts';
import { type NameType, type ValueType } from 'recharts/types/component/DefaultTooltipContent';

export function CustomTooltip({ 
  active, 
  payload, 
  label 
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-black border-2 border-[#00ff00] p-4 font-mono">
      <p className="text-[#00ff00]">{`Month: ${label}`}</p>
      <p className="text-[#00ff00]">
        {`Yield: ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(payload[0].value as number)}`}
      </p>
    </div>
  );
}
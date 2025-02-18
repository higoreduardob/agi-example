import { GrainPropsType } from '@/types/enum'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InferResponseType } from 'hono'
import { client } from '@/lib/hono'

export type ResponseType = InferResponseType<
  typeof client.api.cables.$get,
  200
>['data'][0]

const getColor = (value: number, min: number, max: number) => {
  const ratio = (value - min) / (max - min)
  if (ratio < 0.5) {
    return `rgb(${Math.round(255 * ratio * 2)}, 255, 0)`
  } else {
    return `rgb(255, ${Math.round(255 * (1 - ratio) * 2)}, 0)`
  }
}

const AllProperty = ({ properties }: ResponseType) => {
  const props = properties[0]
  if (!props) {
    return null
  }

  return (
    <>
      <div className="flex gap-1">
        {props.temperature.map((temp, index) => {
          const humidity = props.humidity[index]
          const co2 = props.carboneDioxide[index]
          const isInactive = props.inactiveSensors.includes(index)

          const tempColor = getColor(temp, 0, 60)
          const humidityColor = getColor(humidity, 0, 100)
          const co2Color = getColor(co2, 300, 1000)

          return (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex w-[100px] h-8 rounded overflow-hidden">
                    {!isInactive ? (
                      <>
                        <div
                          className="flex-1 flex items-center justify-center"
                          style={{ backgroundColor: tempColor }}
                        >
                          <span className="text-xs font-semibold text-white">
                            {temp}°C
                          </span>
                        </div>
                        <div
                          className="flex-1 flex items-center justify-center"
                          style={{ backgroundColor: humidityColor }}
                        >
                          <span className="text-xs font-semibold text-white">
                            {humidity}%
                          </span>
                        </div>
                        <div
                          className="flex-1 flex items-center justify-center"
                          style={{ backgroundColor: co2Color }}
                        >
                          <span className="text-xs font-semibold text-white">
                            {co2}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-300"></div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="text-xs">
                    <p>Temperatura: {temp}°C</p>
                    <p>Umidade relativa: {humidity}%</p>
                    <p>CO2: {co2} ppm</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>
    </>
  )
}

export const CardCable = (
  props: ResponseType & { grainPropType: GrainPropsType }
) => {
  return <AllProperty {...props} />
}

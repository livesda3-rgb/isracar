// No model/year heuristics. Only the registered tyre sizes currently have a verified live source.
export const SERVICE_GROUPS=[
 {id:'engineOil',fields:['sae','approval','oilCapacity','alternativeViscosity','interval']},
 {id:'coolant',fields:['approval','oemPart','coolingCapacity','compatibility']},
 {id:'brakeFluid',fields:['dot','approval','interval']},
 {id:'transmission',fields:['gearboxType','gearboxCode','approval','oemPart','serviceCapacity','fullCapacity','interval']},
 {id:'wipers',fields:['driverWiper','passengerWiper','rearWiper','wiperMount']},
 {id:'wheels',fields:['frontTyres','rearTyres','alternativeTyres','wheelSize','pcd','dia','et','pressure']}
];
export function serviceValues(vehicle){return {frontTyres:vehicle.zmig_kidmi||null,rearTyres:vehicle.zmig_ahori||null};}

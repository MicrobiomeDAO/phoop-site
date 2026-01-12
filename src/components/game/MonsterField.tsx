'use client';

import { useMemo } from 'react';
import { CanvasWrapper } from '@/components/3d/CanvasWrapper';
import { Scene } from '@/components/3d/Scene';
import { Monster, type MonsterType } from './Monster';
import { randomPosition } from '@/lib/utils';

interface MonsterFieldProps {
  count?: number;
  monsterTypes?: MonsterType[];
}

export function MonsterField({ count = 10, monsterTypes }: MonsterFieldProps) {
  const monsterTypeList = monsterTypes || ['type1', 'type2', 'type3', 'type4', 'type5', 'type6', 'type7', 'zombie'];

  // Generate random monster data
  const monsters = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const type = monsterTypeList[Math.floor(Math.random() * monsterTypeList.length)];
      const position = randomPosition(-4, 4, -2, 2, -2, 0);
      return { id: i, type, position };
    });
  }, [count, monsterTypeList]);

  return (
    <div className="w-full h-full">
      <CanvasWrapper camera={{ position: [0, 0, 8] }}>
        <Scene>
          {monsters.map((monster) => (
            <Monster
              key={monster.id}
              type={monster.type}
              position={monster.position}
              scale={0.5 + Math.random() * 0.5}
            />
          ))}
        </Scene>
      </CanvasWrapper>
    </div>
  );
}

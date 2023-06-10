import { memo } from 'react';
import { Button as withoutMemoButton } from './Button';

export const Button = memo(withoutMemoButton);

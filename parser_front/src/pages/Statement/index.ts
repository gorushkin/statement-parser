export { StatementProvider } from './Statement';

import { memo } from 'react';
import { StatementProvider as withoutMemoStatementProvider } from './Statement';

export const Button = memo(withoutMemoStatementProvider);

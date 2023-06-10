import { memo } from 'react';

import { Files as FilesWithoutMemo } from './Files';

export const Files = memo(FilesWithoutMemo);

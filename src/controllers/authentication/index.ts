import { catchAsync } from '../../utils/catchAsync.js';
import { TypedRequest as Request } from '../common.js';
import { LoginBody } from './metadata.js';

export const login = catchAsync(async (req: Request<LoginBody>, res, next) => {
  // TODO
  await fetch('');
  res.status(200).json({
    status: 'success',
    data: {},
  });
});

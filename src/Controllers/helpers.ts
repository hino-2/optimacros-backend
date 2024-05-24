export const okResp = (data: any) => ({
  status: true,
  data,
});

export const failResp = (error: any) => ({
  status: false,
  data: error?.message ?? 'Unknown error',
});

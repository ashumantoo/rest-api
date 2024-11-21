export const CreateSuccessResponse = async <T>(status: number, successMessage: string, data?: T) => {
  const successResponse = {
    status,
    successMessage,
    data
  }
  return successResponse;
}

export const CreateErrorResponse = async (status: number, errorMessage: string) => {
  const errorResponse = {
    status,
    errorMessage
  }
  return errorResponse;
}
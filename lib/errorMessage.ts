

const errorMessage = (error: unknown) => {
    return error instanceof Error ? error.message : "An unexpected error occurred";

}

export default errorMessage;
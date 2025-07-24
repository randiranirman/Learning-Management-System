import axios from "axios";

const NEW_URL = "https://localhost:7294/api";

const madeSubmissions = async (assignmetId, madeAssignmentRequest) => {
    try {
        console.log("Assignment Id: ", assignmetId);
        console.log("Request body: ", madeAssignmentRequest);
        const response = await axios.post(`${NEW_URL}/Marks/submit-marks/${assignmetId}`, madeAssignmentRequest);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log("Error while submitting marks: ", error);
        throw error;
    }
}

const getAllSubmissionMarksByAssignmentId = async (assignmentId) => {
    try {
        const response = await axios.get(`${NEW_URL}/marks/get-marks`, {
            params: {
                assignmentId: assignmentId
            }
        })
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const editSubmission = async (submissionId, newMarks) => {
    try {
        console.log(submissionId, newMarks);
        const response =  await axios.put(`${NEW_URL}/marks/edit-marks`, null, {
            params: {
                submissionId: submissionId,
                newMarks: newMarks
            }
        })
        console.log("Response from edit marks: ",response);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const checkIsMarkAllocation = async (assignmentId) => {
    try {
        const response = await axios.get(`${NEW_URL}/marks/isAllocateMarks`, {
            params: {
                assignmentId: assignmentId
            }
        });
        console.log("Response status: ", response.status, response.data);
        return response.data;
    } catch (err) {
        if (err.response && err.response.status === 404) {
            console.log("Mark allocation not found (404).");
            return null;
        } else {
            console.log(err);
            throw err;
        }
    }
};

const allocateMarksForAssignment = async (assignmentId) => {
    try {
        const resposne = await axios.post(`${NEW_URL}/marks/allocate-marks`, null, {
            params: {
                assignmentId: assignmentId
            }
        });
        return resposne.data;
    } catch (err){
        console.log(err);
        throw err;
    }
}

export {
    madeSubmissions,
    editSubmission,
    getAllSubmissionMarksByAssignmentId,
    checkIsMarkAllocation,
    allocateMarksForAssignment
}
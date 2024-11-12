export const saveSelectedOption = (pollId, seletedOptionId) => {
    localStorage.setItem(pollId, seletedOptionId);
}

export const getSelectedOption = (pollId) => {
    const selecetedId = localStorage.getItem(pollId);
    return selecetedId;
}
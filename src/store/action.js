const LOGGED_IN_STATUS = 'LOGGED_IN_STATUS';
const LOGGED_OUT_STATUS = 'LOGGED_OUT_STATUS';

const logged_in_status = () => ({
    type: LOGGED_IN_STATUS
});
const logged_out_status = () => ({
    type: LOGGED_OUT_STATUS
});

export {
    LOGGED_IN_STATUS,
    LOGGED_OUT_STATUS,
    logged_in_status,
    logged_out_status
}
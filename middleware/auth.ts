export default defineNuxtRouteMiddleware(async (to, from) => {
    const { session, refresh } = await useSession();
    await refresh();
    console.log('session from middleware at', from.fullPath, to.fullPath, session.value);
    if(to.path !== '/login' && to.path !== '/signup') {
        if(!session.value?.userId) {
            console.log('I am navigating to login');
            console.log('This is session', session.value);
            return navigateTo('/login');
        }
    }
    return;
});
<template>
    <v-app>
        <template v-if="!isBlocked">
            <v-toolbar dark class="primary">
                <v-toolbar-side-icon
                        @click.stop="sideNav = !sideNav"
                        class="hidden-lg-and-up"></v-toolbar-side-icon>
                <v-toolbar-title>
                    <router-link to="/" v-if="!isAuthenticated" tag="span" style="cursor: pointer">
                        Example App
                    </router-link>
                    <span v-else class="hidden-xs-only hidden-sm-only hidden-md-only">Logged in as: Insert Here</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-xs-only hidden-sm-only hidden-md-only">
                    <v-btn flat v-if="isAuthenticated && isWaiter" :to="'/orders/accepted'">
                        <v-icon left dark>view_list</v-icon>
                        View Example
                    </v-btn>

                    <v-menu v-if="isAuthenticated" offset-y>
                        <v-btn flat slot="activator">
                            <v-icon left dark>account_circle</v-icon>Account<v-icon>arrow_drop_down</v-icon>
                        </v-btn>
                        <v-list>
                            <v-list-tile :to="'/profile'">
                                <v-list-tile-action>
                                    <v-icon left dark color="primary">account_box</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    Profile
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile @click="logout">
                                <v-list-tile-action>
                                    <v-icon dark color="primary">lock</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    Logout
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-menu>

                    <v-btn class="manual-notification-btn" flat v-if="isAuthenticated" @click="manualNotification = true">
                        <v-icon>add_alert</v-icon>
                    </v-btn>

                    <v-btn flat v-if="!isAuthenticated" :to="'/login'">
                        <v-icon left dark>lock_open</v-icon>
                        Login
                    </v-btn>

                </v-toolbar-items>
                <v-toolbar-items>
                    <shift-indicator right v-if="isAuthenticated"></shift-indicator>
                </v-toolbar-items>
            </v-toolbar>
            <!-- DRAWER STARTS HERE -->
            <v-layout>
                <v-navigation-drawer temporary absolute v-model="sideNav">
                    <v-list>
                        <v-subheader>
                            <span v-if="!isAuthenticated">Example Page</span>
                            <span v-else>Logged in as: {{ role | capitalize }}</span>
                        </v-subheader>

                        <v-list-tile v-if="true" :to="'/example'">
                            <v-list-tile-action>
                                <v-icon>view_list</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>View page</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-navigation-drawer>

                <v-content>
                    <router-view></router-view>
                </v-content>

            </v-layout>
            <manual-notification-dialog :show="manualNotification" @close="manualNotification = false"></manual-notification-dialog>
        </template>
        <template v-else>
            <v-layout align-center justify-center row fill-height>
                <div>
                    <h1>YOU ARE CURRENTLY BLOCKED</h1>
                    <br>
                    <v-layout justify-center>
                        <v-btn color="primary" @click="logout">
                            <v-icon left>lock</v-icon>
                            LOGOUT
                        </v-btn>
                    </v-layout>
                </div>
            </v-layout>
        </template>
    </v-app>
</template>

<script>
    import Noty from 'noty';
    Noty.overrideDefaults({
        layout: 'bottomRight',
        theme: 'metroui',
        closeWith: ['click', 'button'],
        timeout: 5000,
    });
    export default {
        data: function () {
            return {
                sideNav: false,
                manualNotification: false
            }
        },
        computed: {
            isAuthenticated: function() {
                return this.$store.getters.isAuthenticated;
            },
        },
        methods: {
            logout: function() {
                this.$store.commit('logout');
                this.$router.push({ path: '/'});
            }
        },
        sockets: {
        },
    }
</script>

<style scoped>
</style>
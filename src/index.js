import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import React, { Component, useContext } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View, Text, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { UserContext } from './UserContext';

import {
  HomeScreen,
  LoginScreen,
  CreateAccount,
  CreateService,
  Profile,
  MyServices,
  OpenServices,
  PendingServices,
  ServiceHistory,
  CreateWorker,
  SearchService,
  MyServicesWorker,
  OpenServicesWorker,
  ServiceHistoryWorker,
  PendingServicesWorker,
  ChangetoClient,
  Notifications,
  NotificationIcon
} from './screens';


/*************************************** CLIENT SIDE  *************************************************/

const createNavigator = createStackNavigator(
  {
    create2: {
      screen: CreateService,
      navigationOptions: {
        headerLeft: () => null,
        title: 'Announce Service',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'create2',

  }
);

const ServicesNavigator = createStackNavigator(
  {
    services2: {
      screen: MyServices,
      navigationOptions: {
        headerLeft: () => null,
        title: 'My Services',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'services2',
  }
);

const NotificationsNavigator = createStackNavigator(
  {
    create2: {
      screen: Notifications,
      navigationOptions: {
        headerLeft: () => null,
        title: 'Notifications',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'create2',

  }
);

const profileNavigator = createStackNavigator(
  {
    profile2: {
      screen: Profile,
      navigationOptions: {
        headerLeft: () => null,
        title: 'Profile',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'profile2',
  }
);

const TabNavigator = createMaterialBottomTabNavigator(
  {
    create: {
      screen: createNavigator,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Announce</Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome5 name={'plus-circle'} size={20} style={{ color: tintColor }} />
          </View>
        ),
      },
    },
    services: {
      screen: ServicesNavigator,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Services</Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome5 name={'tools'} size={20} style={{ color: tintColor }} />
          </View>
        ),
      },
    },
    worker: {
      screen: CreateWorker,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Worker</Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome5 name={'exchange-alt'} size={20} style={{ color: tintColor }} />
          </View>
        ),
      }
    },
    notifications: {
      screen: NotificationsNavigator,
      navigationOptions: ({ screenProps }) => ({
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Notifications</Text>,
        tabBarIcon: ({ tintColor, props }) =>
          <View>
            <MaterialCommunityIcons name="bell" color={tintColor} size={20} />
            <NotificationIcon {...props} />
          </View>
      })
    },
    profile: {
      screen: profileNavigator,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Profile</Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome5 name={'user-alt'} size={20} style={{ color: tintColor }} />
          </View>
        ),
      }
    }
  },

  {
    initialRouteName: 'create',
    activeColor: '#2292A4',
    activeTintColor: '#2292A4',
    inactiveColor: '#696969',
    barStyle: { backgroundColor: '#EEEEEE' },
    resetOnBlur: true,
    shifting: false

  }

);

const OpenServicesNavigator = createStackNavigator(
  {
    OpenServices2: {
      screen: OpenServices,
      navigationOptions: {
        headerTintColor: 'white',
        title: 'Open Services',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'OpenServices2',
  }
);

const PendingServicesNavigator = createStackNavigator(
  {
    PendingServices2: {
      screen: PendingServices,
      navigationOptions: {
        headerTintColor: 'white',
        title: 'Pending Services',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'PendingServices2',
  }
);
const ServiceHistoryNavigator = createStackNavigator(
  {
    ServiceHistory2: {
      screen: ServiceHistory,
      navigationOptions: {
        headerTintColor: 'white',
        title: 'Service History',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'ServiceHistory2',
  }
);

/*************************************** WORKER SIDE  *************************************************/

const SearchNavigator = createStackNavigator(
  {
    searchTab: {
      screen: SearchService,
      navigationOptions: {
        headerLeft: () => null,
        title: 'Search Service',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'searchTab',
  }
);

const MyServicesWorkerNavigator = createStackNavigator(
  {
    searchTab: {
      screen: MyServicesWorker,
      navigationOptions: {
        headerLeft: () => null,
        title: 'My Services',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'searchTab',
  }
);

const workerTabNavigator = createMaterialBottomTabNavigator(
  {
    search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Search Service</Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome5 name={'search'} size={20} style={{ color: tintColor }} />
          </View>
        ),
      }
    },
    workerServices: {
      screen: MyServicesWorkerNavigator,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Services</Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome5 name={'tools'} size={20} style={{ color: tintColor }} />
          </View>
        ),
      }
    },
    clientChange: {
      screen: ChangetoClient,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Client</Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome5 name={'exchange-alt'} size={20} style={{ color: tintColor }} />
          </View>
        ),
      }
    },
    workerNotifications: {
      screen: NotificationsNavigator,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Notifications</Text>,
        tabBarIcon: ({ tintColor, props }) =>
          <View>
            <MaterialCommunityIcons name="bell" color={tintColor} size={20} />
            <NotificationIcon {...props} />
          </View>
      }
    },
    workerProfile: {
      screen: profileNavigator,
      navigationOptions: {
        tabBarLabel: <Text style={{ textAlign: "center", fontSize: 12 }}>Profile</Text>,
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome5 name={'user-alt'} size={20} style={{ color: tintColor }} />
          </View>
        ),
      }
    }
  },

  {
    initialRouteName: 'search',
    activeColor: '#2292A4',
    activeTintColor: '#2292A4',
    inactiveColor: '#696969',
    barStyle: { backgroundColor: '#EEEEEE' },
    resetOnBlur: true,
    shifting: false

  }

);

const OpenServicesWorkerNavigator = createStackNavigator(
  {
    OpenServicesWorker2: {
      screen: OpenServicesWorker,
      navigationOptions: {
        headerTintColor: 'white',
        title: 'Open Services',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'OpenServicesWorker2',
  }
);

const ServiceHistoryWorkerNavigator = createStackNavigator(
  {
    ServiceHistoryWorker2: {
      screen: ServiceHistoryWorker,
      navigationOptions: {
        headerTintColor: 'white',
        title: 'Service History',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'ServiceHistoryWorker2',
  }
);

const PendingServicesWorkerNavigator = createStackNavigator(
  {
    ServiceHistoryWorker2: {
      screen: PendingServicesWorker,
      navigationOptions: {
        headerTintColor: 'white',
        title: 'Service History',
        headerStyle: {
          backgroundColor: '#2292A4',
        },
        headerTitleStyle: {
          color: '#ffffff',
          fontSize: 20,
          paddingLeft: 16
        },
      },
    },
  },
  {
    initialRouteName: 'ServiceHistoryWorker2',
  }
);

const Worker = createStackNavigator(
  {
    workerNavigator: {
      screen: workerTabNavigator,
      navigationOptions: {
        headerLeft: () => null,
      },
    },
    OpenServicesWorkerOption: {
      screen: OpenServicesWorkerNavigator
    },
    ServiceHistoryWorkerOption: {
      screen: ServiceHistoryWorkerNavigator
    },
    PendingServicesWorkerOption: {
      screen: PendingServicesWorkerNavigator
    },
  },
  {
    initialRouteName: 'workerNavigator',
    headerMode: 'none',
  }
);

const Client = createStackNavigator(
  {
    CreateService: {
      screen: TabNavigator,
      navigationOptions: {
        headerLeft: () => null,
      },
    },
    OpenServices: {
      screen: OpenServicesNavigator
    },
    PendingServices: {
      screen: PendingServicesNavigator
    },
    ServiceHistory: {
      screen: ServiceHistoryNavigator
    },
  },
  {
    initialRouteName: 'CreateService',
    headerMode: 'none',
  }
);



/************************************** INCIAL ROUTER *******************************************/

const Router = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen
    },
    LoginScreen: {
      screen: LoginScreen
    },
    CreateAccount: {
      screen: CreateAccount,
    },
    CreateService: {
      screen: Client
    },
    WorkerTab: {
      screen: Worker,
    }
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);  

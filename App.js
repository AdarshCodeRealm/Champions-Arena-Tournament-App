import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  FlatList 
} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

// Define mock data - this would come from a database in the future
// Modified to focus only on Free Fire
const GAMES = [
  { id: '1', name: 'Free Fire MAX', image: 'https://via.placeholder.com/80' },
];

const TOURNAMENTS = [
  { 
    id: '1', 
    name: 'Free Fire Summer Championship', 
    game: 'Free Fire MAX',
    prize: '$1,000', 
    date: 'June 15, 2023',
    teams: 32,
    status: 'upcoming',
  },
  { 
    id: '2', 
    name: 'Free Fire Winter League', 
    game: 'Free Fire MAX',
    prize: '$500', 
    date: 'December 5, 2023',
    teams: 16,
    status: 'upcoming',
  },
  { 
    id: '3', 
    name: 'Free Fire Spring Tournament', 
    game: 'Free Fire MAX',
    prize: '$750', 
    date: 'March 10, 2023',
    teams: 24,
    status: 'completed',
  },
];

// Leaderboard data for Solo, Duo and Squad
const LEADERBOARD_DATA = {
  solo: [
    { id: '1', name: 'Alex Johnson', rank: 1, kills: 342, wins: 42, avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Maria Garcia', rank: 2, kills: 315, wins: 39, avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'James Wilson', rank: 3, kills: 301, wins: 36, avatar: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Sarah Lee', rank: 4, kills: 287, wins: 34, avatar: 'https://via.placeholder.com/50' },
    { id: '5', name: 'David Kim', rank: 5, kills: 265, wins: 32, avatar: 'https://via.placeholder.com/50' },
  ],
  duo: [
    { id: '1', name: 'Team Phoenix', rank: 1, kills: 562, wins: 53, members: 'Alex & James', avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Dragon Slayers', rank: 2, kills: 521, wins: 48, members: 'Maria & Sarah', avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Shadow Warriors', rank: 3, kills: 498, wins: 45, members: 'David & Michael', avatar: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Victory Duo', rank: 4, kills: 476, wins: 42, members: 'Jessica & Thomas', avatar: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Elite Force', rank: 5, kills: 459, wins: 40, members: 'Robert & Emma', avatar: 'https://via.placeholder.com/50' },
  ],
  squad: [
    { id: '1', name: 'Team Alpha', rank: 1, kills: 1245, wins: 87, members: '4 members', avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Immortals', rank: 2, kills: 1187, wins: 82, members: '4 members', avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Global Elites', rank: 3, kills: 1120, wins: 78, members: '4 members', avatar: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Phoenix Rising', rank: 4, kills: 1056, wins: 75, members: '4 members', avatar: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Invincible', rank: 5, kills: 982, wins: 71, members: '4 members', avatar: 'https://via.placeholder.com/50' },
  ]
};

const USERS = [
  { id: '1', name: 'Alex Johnson', rank: 1, wins: 42, losses: 5, avatar: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Maria Garcia', rank: 2, wins: 39, losses: 8, avatar: 'https://via.placeholder.com/50' },
  { id: '3', name: 'James Wilson', rank: 3, wins: 36, losses: 10, avatar: 'https://via.placeholder.com/50' },
  { id: '4', name: 'Sarah Lee', rank: 4, wins: 34, losses: 12, avatar: 'https://via.placeholder.com/50' },
  { id: '5', name: 'David Kim', rank: 5, wins: 32, losses: 15, avatar: 'https://via.placeholder.com/50' },
];

// User profile data
const USER_PROFILE = {
  name: "John Doe",
  username: "@johndoe",
  avatar: "https://via.placeholder.com/80",
  rank: "Diamond III",
  level: 52
};

const MENU_ITEMS = [
  { id: '1', title: 'Premium Plans', icon: 'crown' },
  { id: '2', title: 'Creator Profile', icon: 'person' },
  { id: '3', title: 'Manage Communities', icon: 'shield' },
  { id: '4', title: 'Manage Teams', icon: 'people' },
  { id: '5', title: 'Giveaways', icon: 'gift' },
  { id: '6', title: 'Claim Gift Card', icon: 'card' },
  { id: '7', title: 'Store', icon: 'storefront' },
  { id: '8', title: 'Offers Wall', icon: 'cash' },
  { id: '9', title: 'Convert Play Balance', icon: 'wallet' },
  { id: '10', title: 'Game Zone', icon: 'game-controller' },
  { id: '11', title: 'Leaderboard', icon: 'stats-chart', isNew: true },
];

// Custom theme for NavigationContainer
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0a1622',
    primary: '#0d84c3',
    card: '#0d1a26',
    text: '#ffffff',
    border: '#0d2436',
    notification: '#0d84c3',
  },
};

// Home Screen Component
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FREE FIRE TOURNAMENTS</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{USER_PROFILE.rank}</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: USER_PROFILE.avatar }} 
              style={styles.profileAvatar} 
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {/* Featured Games */}
        <Text style={styles.sectionTitle}>FREE FIRE MAX</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={GAMES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.gameCard}>
              <Image source={{ uri: item.image }} style={styles.gameImage} />
              <Text style={styles.gameName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.gamesList}
        />
        
        {/* Upcoming Tournaments */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>UPCOMING TOURNAMENTS</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {TOURNAMENTS.filter(t => t.status === 'upcoming').map((tournament) => (
          <TouchableOpacity key={tournament.id} style={styles.tournamentCard}>
            <View style={styles.tournamentHeader}>
              <Text style={styles.tournamentName}>{tournament.name}</Text>
              <View style={styles.prizeBadge}>
                <Text style={styles.prizeText}>{tournament.prize}</Text>
              </View>
            </View>
            <Text style={styles.tournamentGame}>{tournament.game}</Text>
            <View style={styles.tournamentDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar-outline" size={16} color="#0d84c3" />
                <Text style={styles.detailText}>{tournament.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="people-outline" size={16} color="#0d84c3" />
                <Text style={styles.detailText}>{tournament.teams} Teams</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        
        {/* Top Players */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TOP PLAYERS</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {USERS.slice(0, 3).map((player, index) => (
          <View key={player.id} style={styles.playerCard}>
            <Text style={styles.playerRank}>#{player.rank}</Text>
            <Image source={{ uri: player.avatar }} style={styles.playerAvatar} />
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerStats}>{player.wins} Wins • {player.losses} Losses</Text>
            </View>
            <View style={[styles.playerBadge, { backgroundColor: index === 0 ? '#ffc107' : '#0d84c3' }]}>
              <Ionicons name={index === 0 ? 'trophy' : 'star'} size={14} color="#fff" />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Matches Screen Component
const MatchesScreen = () => {
  const [activeTab, setActiveTab] = useState('matches');
  
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FREE FIRE MATCHES</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{USER_PROFILE.rank}</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: USER_PROFILE.avatar }} 
              style={styles.profileAvatar} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'matches' && styles.activeTabButton]} 
          onPress={() => setActiveTab('matches')}
        >
          <Text style={[styles.tabText, activeTab === 'matches' && styles.activeTabText]}>MATCHES</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'mymatches' && styles.activeTabButton]} 
          onPress={() => setActiveTab('mymatches')}
        >
          <Text style={[styles.tabText, activeTab === 'mymatches' && styles.activeTabText]}>MY MATCHES</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.matchesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Matches</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitleText}>Play & win thousands everyday</Text>
        
        <View style={styles.emptyStateContainer}>
          <Ionicons name="game-controller" size={80} color="#0d84c3" style={styles.emptyStateIcon} />
          <Text style={styles.emptyStateText}>No matches found</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// New Leaderboard Screen Component
const LeaderboardScreen = () => {
  const [activeTab, setActiveTab] = useState('solo');
  
  const renderLeaderboardItem = (item, index) => (
    <View key={item.id} style={styles.leaderboardItem}>
      <Text style={styles.leaderboardRank}>#{item.rank}</Text>
      <Image source={{ uri: item.avatar }} style={styles.leaderboardAvatar} />
      <View style={styles.leaderboardInfo}>
        <Text style={styles.leaderboardName}>{item.name}</Text>
        <Text style={styles.leaderboardStats}>
          {activeTab === 'solo' ? 
            `${item.kills} Kills • ${item.wins} Wins` : 
            activeTab === 'duo' ? 
              `${item.members} • ${item.wins} Wins` : 
              `${item.members} • ${item.wins} Wins`
          }
        </Text>
      </View>
      <View style={[styles.leaderboardBadge, { backgroundColor: index === 0 ? '#ffc107' : (index === 1 ? '#95a5a6' : (index === 2 ? '#cd7f32' : '#0d84c3')) }]}>
        <Ionicons name={index < 3 ? 'trophy' : 'star'} size={14} color="#fff" />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FREE FIRE LEADERBOARD</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{USER_PROFILE.rank}</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={{ uri: USER_PROFILE.avatar }} 
              style={styles.profileAvatar} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'solo' && styles.activeTabButton]} 
          onPress={() => setActiveTab('solo')}
        >
          <Text style={[styles.tabText, activeTab === 'solo' && styles.activeTabText]}>SOLO</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'duo' && styles.activeTabButton]} 
          onPress={() => setActiveTab('duo')}
        >
          <Text style={[styles.tabText, activeTab === 'duo' && styles.activeTabText]}>DUO</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'squad' && styles.activeTabButton]} 
          onPress={() => setActiveTab('squad')}
        >
          <Text style={[styles.tabText, activeTab === 'squad' && styles.activeTabText]}>SQUAD</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.leaderboardHeader}>
        <View style={styles.leaderboardHeaderItem}>
          <Text style={styles.leaderboardHeaderText}>Rank</Text>
        </View>
        <View style={[styles.leaderboardHeaderItem, {flex: 2}]}>
          <Text style={styles.leaderboardHeaderText}>Player/Team</Text>
        </View>
        <View style={styles.leaderboardHeaderItem}>
          <Text style={styles.leaderboardHeaderText}>Wins</Text>
        </View>
      </View>
      
      <ScrollView style={styles.container}>
        {LEADERBOARD_DATA[activeTab].map((item, index) => renderLeaderboardItem(item, index))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Profile Screen Component
const ProfileScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>PROFILE</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.profileName}>{USER_PROFILE.rank}</Text>
          <TouchableOpacity style={styles.profileButton} onPress={() => setMenuVisible(!menuVisible)}>
            <Image 
              source={{ uri: USER_PROFILE.avatar }} 
              style={styles.profileAvatar} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      {menuVisible ? (
        <ScrollView style={styles.menuContainer}>
          <View style={styles.profileSection}>
            <Image 
              source={{ uri: USER_PROFILE.avatar }} 
              style={styles.profileImage} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{USER_PROFILE.name}</Text>
              <Text style={styles.profileUsername}>{USER_PROFILE.username}</Text>
            </View>
          </View>
          
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={20} color="#fff" />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
              {item.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>New</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.profileHeaderCard}>
            <Image 
              source={{ uri: USER_PROFILE.avatar }} 
              style={styles.profileHeaderImage} 
            />
            <Text style={styles.profileHeaderName}>{USER_PROFILE.name}</Text>
            <Text style={styles.profileHeaderUsername}>{USER_PROFILE.username}</Text>
            <View style={styles.profileRankBadge}>
              <Text style={styles.profileRankText}>{USER_PROFILE.rank}</Text>
            </View>
            <Text style={styles.profileLevel}>Level {USER_PROFILE.level}</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>24</Text>
                <Text style={styles.statLabel}>Tournaments</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>156</Text>
                <Text style={styles.statLabel}>Matches</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Teams</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.sectionCard}>
            <Text style={styles.sectionCardTitle}>Achievements</Text>
            <View style={styles.achievementRow}>
              <View style={styles.achievement}>
                <View style={styles.achievementIcon}>
                  <Ionicons name="trophy" size={24} color="#ffc107" />
                </View>
                <Text style={styles.achievementText}>Tournament Winner</Text>
              </View>
              <View style={styles.achievement}>
                <View style={styles.achievementIcon}>
                  <Ionicons name="star" size={24} color="#0d84c3" />
                </View>
                <Text style={styles.achievementText}>Top Player</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionCardTitle}>Recent Matches</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.matchHistoryItem}>
                <View style={[
                  styles.matchResultIndicator, 
                  { backgroundColor: item % 2 === 0 ? '#e74c3c' : '#2ecc71' }
                ]} />
                <View style={styles.matchHistoryContent}>
                  <Text style={styles.matchHistoryTitle}>
                    {item % 2 === 0 ? 'Lost to Team Alpha' : 'Won against Team Beta'}
                  </Text>
                  <Text style={styles.matchHistoryDetails}>
                    Free Fire MAX • {item} days ago
                  </Text>
                </View>
                <Text style={styles.matchHistoryScore}>
                  {item % 2 === 0 ? '2 - 3' : '3 - 1'}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Matches') {
                iconName = focused ? 'trophy' : 'trophy-outline';
              } else if (route.name === 'Leaderboard') {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0d84c3',
            tabBarInactiveTintColor: '#6c757d',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#0d1a26',
              borderTopColor: '#0d2436',
              height: 60,
              paddingBottom: 10,
              paddingTop: 5,
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Matches" component={MatchesScreen} />
          <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Complete styles for the app
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0a1622',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0d1a26',
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#0d2436',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    color: '#ffffff',
    marginRight: 8,
    fontSize: 14,
  },
  profileButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0d84c3',
  },
  profileAvatar: {
    height: '100%',
    width: '100%',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  viewAllText: {
    color: '#0d84c3',
    fontSize: 12,
  },
  subtitleText: {
    color: '#6c757d',
    fontSize: 12,
    marginBottom: 15,
  },
  gamesList: {
    marginBottom: 10,
  },
  gameCard: {
    marginRight: 15,
    alignItems: 'center',
  },
  gameImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#0d84c3',
  },
  gameName: {
    color: '#ffffff',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  tournamentCard: {
    backgroundColor: '#0d1a26',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0d2436',
  },
  tournamentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  tournamentName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  prizeBadge: {
    backgroundColor: '#0d84c3',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  prizeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tournamentGame: {
    color: '#6c757d',
    fontSize: 12,
    marginBottom: 8,
  },
  tournamentDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
  },
  registerButton: {
    backgroundColor: '#0d84c3',
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d1a26',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#0d2436',
  },
  playerRank: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    width: 30,
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  playerStats: {
    color: '#6c757d',
    fontSize: 12,
  },
  playerBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#0d1a26',
    borderBottomWidth: 1,
    borderBottomColor: '#0d2436',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#0d84c3',
  },
  tabText: {
    color: '#6c757d',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#ffffff',
  },
  matchesContainer: {
    flex: 1,
    padding: 16,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  emptyStateIcon: {
    marginBottom: 16,
    opacity: 0.7,
  },
  emptyStateText: {
    color: '#6c757d',
    fontSize: 16,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: '#0d1a26',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0d2436',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileUsername: {
    color: '#6c757d',
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#0d2436',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0d84c3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemText: {
    color: '#ffffff',
    fontSize: 16,
    flex: 1,
  },
  newBadge: {
    backgroundColor: '#e74c3c',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileHeaderCard: {
    backgroundColor: '#0d1a26',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0d2436',
  },
  profileHeaderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#0d84c3',
  },
  profileHeaderName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileHeaderUsername: {
    color: '#6c757d',
    fontSize: 14,
    marginBottom: 10,
  },
  profileRankBadge: {
    backgroundColor: '#0d84c3',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: 5,
  },
  profileRankText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  profileLevel: {
    color: '#ffffff',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#0d2436',
  },
  statNumber: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#6c757d',
    fontSize: 12,
  },
  sectionCard: {
    backgroundColor: '#0d1a26',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#0d2436',
  },
  sectionCardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievement: {
    alignItems: 'center',
    flex: 1,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(13, 132, 195, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementText: {
    color: '#ffffff',
    fontSize: 12,
  },
  matchHistoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0d2436',
  },
  matchResultIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  matchHistoryContent: {
    flex: 1,
  },
  matchHistoryTitle: {
    color: '#ffffff',
    fontSize: 14,
  },
  matchHistoryDetails: {
    color: '#6c757d',
    fontSize: 12,
  },
  matchHistoryScore: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Leaderboard styles
  leaderboardHeader: {
    flexDirection: 'row',
    backgroundColor: '#0d1a26',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0d2436',
  },
  leaderboardHeaderItem: {
    flex: 1,
    alignItems: 'center',
  },
  leaderboardHeaderText: {
    color: '#6c757d',
    fontSize: 12,
    fontWeight: 'bold',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d1a26',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#0d2436',
  },
  leaderboardRank: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    width: 30,
  },
  leaderboardAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  leaderboardStats: {
    color: '#6c757d',
    fontSize: 12,
  },
  leaderboardBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  
import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../ui/Header';
import TabBar from '../ui/TabBar';
import SectionHeader from '../ui/SectionHeader';
import TournamentCard from '../ui/TournamentCard';
import { globalStyles, tournamentStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/globalStyles';

// Mock data directly in MatchesScreen
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

const ENROLLED_TOURNAMENTS = [
  { 
    id: '1', 
    name: 'Free Fire Pro League', 
    game: 'Free Fire MAX',
    date: 'June 18, 2023',
    time: '8:00 PM',
    status: 'Confirmed',
  },
  { 
    id: '2', 
    name: 'Season Qualifiers', 
    game: 'Free Fire MAX',
    date: 'June 25, 2023',
    time: '7:30 PM',
    status: 'Pending',
  }
];

const USER_PROFILE = {
  name: "John Doe",
  username: "@johndoe",
  avatar: "https://via.placeholder.com/80",
  rank: "Diamond III",
  level: 52
};

const MatchesScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('tournaments');
  
  const tabs = [
    { id: 'tournaments', label: 'TOURNAMENTS' },
    { id: 'enrolled', label: 'MY ENROLLMENTS' }
  ];

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
  };

  const handleTournamentPress = (tournament) => {
    console.log('Tournament pressed:', tournament);
    // Navigate to tournament details
  };

  const handleTeamDetailsPress = (tournament) => {
    console.log('Team details pressed:', tournament);
    // Navigate to team details
  };

  const handleCancelRegistration = (tournament) => {
    console.log('Cancel registration pressed:', tournament);
    // Show confirmation dialog
  };

  const handleBrowseTournaments = () => {
    setActiveTab('tournaments');
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
      <Header 
        title="Champions PixelNet"
        profile={USER_PROFILE}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      
      <TabBar 
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
      
      <ScrollView style={globalStyles.container}>
        {activeTab === 'tournaments' ? (
          <>
            <SectionHeader 
              title="All Tournaments" 
              showViewAll={true}
              viewAllText="Filter"
              onViewAllPress={() => console.log('Filter pressed')}
            />
            <Text style={globalStyles.subtitleText}>Browse and register for tournaments</Text>
            
            {TOURNAMENTS.map((tournament) => (
              <TournamentCard 
                key={tournament.id}
                tournament={tournament}
                onPress={handleTournamentPress}
              />
            ))}
          </>
        ) : (
          <>
            <SectionHeader title="My Enrolled Tournaments" />
            
            {ENROLLED_TOURNAMENTS.length > 0 ? (
              ENROLLED_TOURNAMENTS.map((tournament) => (
                <TouchableOpacity 
                  key={tournament.id} 
                  style={tournamentStyles.enrolledCard}
                  onPress={() => handleTournamentPress(tournament)}
                >
                  <View style={tournamentStyles.enrolledHeader}>
                    <Text style={tournamentStyles.enrolledName}>{tournament.name}</Text>
                    <View style={[tournamentStyles.statusBadge, { 
                      backgroundColor: tournament.status === 'Confirmed' ? colors.status.success : colors.status.warning
                    }]}>
                      <Text style={tournamentStyles.statusText}>{tournament.status}</Text>
                    </View>
                  </View>
                  <Text style={tournamentStyles.tournamentGame}>{tournament.game}</Text>
                  <View style={tournamentStyles.tournamentDetails}>
                    <View style={tournamentStyles.detailItem}>
                      <Ionicons name="calendar-outline" size={16} color={colors.primary} />
                      <Text style={tournamentStyles.detailText}>{tournament.date}</Text>
                    </View>
                    <View style={tournamentStyles.detailItem}>
                      <Ionicons name="time-outline" size={16} color={colors.primary} />
                      <Text style={tournamentStyles.detailText}>{tournament.time}</Text>
                    </View>
                  </View>
                  <View style={tournamentStyles.buttonRow}>
                    <TouchableOpacity 
                      style={tournamentStyles.detailButton}
                      onPress={() => handleTeamDetailsPress(tournament)}
                    >
                      <Text style={tournamentStyles.detailButtonText}>Team Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={tournamentStyles.cancelButton}
                      onPress={() => handleCancelRegistration(tournament)}
                    >
                      <Text style={tournamentStyles.cancelButtonText}>Cancel Registration</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={globalStyles.emptyStateContainer}>
                <Ionicons 
                  name="trophy-outline" 
                  size={80} 
                  color={colors.primary} 
                  style={{ marginBottom: 16, opacity: 0.7 }}
                />
                <Text style={{ color: colors.text.secondary, fontSize: 16 }}>
                  You haven't enrolled in any tournaments yet
                </Text>
                <TouchableOpacity 
                  style={[globalStyles.primaryButton, { marginTop: 20, width: 200 }]}
                  onPress={handleBrowseTournaments}
                >
                  <Text style={globalStyles.primaryButtonText}>Browse Tournaments</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatchesScreen; 
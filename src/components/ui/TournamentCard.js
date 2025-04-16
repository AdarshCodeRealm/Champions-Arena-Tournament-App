import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { tournamentStyles } from '../../styles/globalStyles';

const TournamentCard = ({ tournament, onPress }) => {
  return (
    <TouchableOpacity 
      style={tournamentStyles.tournamentCard} 
      onPress={() => onPress(tournament)}
    >
      {tournament.bannerImage && (
        <Image
          source={{ uri: tournament.bannerImage }}
          style={tournamentStyles.bannerImage}
          resizeMode="cover"
        />
      )}
      <View style={tournamentStyles.tournamentHeader}>
        <Text style={tournamentStyles.tournamentName}>{tournament.name}</Text>
        <View style={tournamentStyles.prizeBadge}>
          <Text style={tournamentStyles.prizeText}>{tournament.prize}</Text>
        </View>
      </View>
      <Text style={tournamentStyles.tournamentGame}>{tournament.game}</Text>
      <View style={tournamentStyles.tournamentDetails}>
        <View style={tournamentStyles.detailItem}>
          <Ionicons name="calendar-outline" size={16} color="#0d84c3" />
          <Text style={tournamentStyles.detailText}>{tournament.date}</Text>
        </View>
        <View style={tournamentStyles.detailItem}>
          <Ionicons name="people-outline" size={16} color="#0d84c3" />
          <Text style={tournamentStyles.detailText}>
            {tournament.registeredTeams}/{tournament.maxTeams} Teams
          </Text>
        </View>
        {tournament.status && (
          <View style={tournamentStyles.detailItem}>
            <Ionicons name="flag-outline" size={16} color="#0d84c3" />
            <Text style={tournamentStyles.detailText}>{tournament.status}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity 
        style={tournamentStyles.registerButton} 
        onPress={() => onPress(tournament)}
      >
        <Text style={tournamentStyles.registerButtonText}>
          {tournament.status === 'upcoming' ? 'Register Now' : 'View Details'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TournamentCard;
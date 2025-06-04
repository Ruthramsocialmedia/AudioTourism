import { useState } from 'react';
import "./ProfileScreen.css";
import {
  Settings,
  Star,
  Headphones,
  Camera,
  Bell,
  Languages,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProfileScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'hindi', label: 'Hindi' },
  ];

  const userStats = {
    name: 'Priya Sharma',
    joinDate: 'Member since Nov 2024',
    toursCompleted: 12,
    journalEntries: 28,
    favoriteLanguage: 'Tamil',
    avatar:
      'https://images.unsplash.com/photo-1624610261655-777af2f586d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  const achievements = [
    { id: 1, title: 'Temple Explorer', icon: '🏛️', description: 'Visited 10 temples' },
    { id: 2, title: 'Story Teller', icon: '🎙️', description: 'Created 25 voice notes' },
    { id: 3, title: 'Cultural Enthusiast', icon: '🎭', description: 'Completed heritage tour' },
    { id: 4, title: 'Photography Lover', icon: '📸', description: 'Captured 50 moments' },
  ];

  const recentActivity = [
    { title: 'Completed: Ancient Temples Tour', date: '2 hours ago', type: 'tour' },
    { title: 'Added voice note at Thanjavur', date: '5 hours ago', type: 'journal' },
    { title: 'Shared: Desert Fort Experience', date: '1 day ago', type: 'share' },
    { title: 'Downloaded: Heritage Markets Tour', date: '2 days ago', type: 'download' },
  ];

  const SettingCard = ({ title, children }) => (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <Card className="mb-6">
        <CardContent className="p-4 space-y-6">{children}</CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="px-4 pt-6 space-y-8">
        {/* User Profile Header */}
        <div className="text-white relative image_bg rounded-2xl p-6 shadow">
          <div className="absolute inset-0 rounded-2xl bg-black/40" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex z-10 items-center space-x-4">
              <img
                src={userStats.avatar}
                alt={userStats.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white object-cover"
              />
              <div>
                <h1 className="text-xl font-bold">{userStats.name}</h1>
                <p className="text-sm">{userStats.joinDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-white font-semibold">
              <div className="bg-white/25 glass-card-discover rounded-xl py-3">
                <div className="text-lg">{userStats.toursCompleted}</div>
                <div className="text-xs">Tours</div>
              </div>
              <div className="bg-white/25 glass-card-discover rounded-xl py-3">
                <div className="text-lg">{userStats.journalEntries}</div>
                <div className="text-xs">Entries</div>
              </div>
              <div className="bg-white/25 glass-card-discover rounded-xl py-3">
                <div className="text-lg">{userStats.favoriteLanguage}</div>
                <div className="text-xs">Language</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <SettingCard title="⚡ Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 flex items-center justify-center">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </Button>
            <Button variant="outline" className="h-12 flex items-center justify-center">
              <Star className="w-5 h-5 mr-2" />
              Favorites
            </Button>
          </div>
        </SettingCard>

        {/* Achievements */}
        <SettingCard title="🏆 Achievements">
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="text-center">
                <CardContent className="p-4">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className="font-medium text-sm text-gray-900 mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-gray-500">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SettingCard>

        {/* Preferences */}
        <SettingCard title="⚙️ Preferences">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Languages className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900">Language</h3>
                <p className="text-sm text-gray-500">Choose your preferred language</p>
              </div>
            </div>
            <Select value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900">Notifications</h3>
                <p className="text-sm text-gray-500">Tour updates and reminders</p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Headphones className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900">Offline Mode</h3>
                <p className="text-sm text-gray-500">Download tours for offline use</p>
              </div>
            </div>
            <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
          </div>
        </SettingCard>

        {/* Recent Activity */}
        <SettingCard title="🕒 Recent Activity">
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'tour'
                        ? 'bg-orange-100 text-orange-600'
                        : activity.type === 'journal'
                        ? 'bg-emerald-100 text-emerald-600'
                        : activity.type === 'share'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {activity.type === 'tour' ? (
                      <Headphones className="w-4 h-4" />
                    ) : activity.type === 'journal' ? (
                      <Camera className="w-4 h-4" />
                    ) : activity.type === 'share' ? (
                      '📤'
                    ) : (
                      '📥'
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SettingCard>

        {/* Accessibility */}
        <SettingCard title="🔧 Accessibility">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Audio Enhancement</h3>
              <p className="text-sm text-gray-500">Boost audio clarity and volume</p>
            </div>
            <Switch />
          </div>
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Haptic Feedback</h3>
              <p className="text-sm text-gray-500">Feel vibrations for navigation cues</p>
            </div>
            <Switch defaultChecked />
          </div>
        </SettingCard>

        {/* Downloads & Storage */}
        <SettingCard title="💾 Downloads & Storage">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Manage Downloads</h3>
              <p className="text-sm text-gray-500">3.2 GB used • 8 tours offline</p>
            </div>
            <Button variant="outline" size="sm" className="h-10 px-4">
              Manage
            </Button>
          </div>
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Storage Optimization</h3>
              <p className="text-sm text-gray-500">
                Auto-delete completed tours after 30 days
              </p>
            </div>
            <Switch />
          </div>
        </SettingCard>

        {/* Integrations */}
        <SettingCard title="🔗 Integrations">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Calendar Integration</h3>
              <p className="text-sm text-gray-500">
                Sync tour schedules with your calendar
              </p>
            </div>
            <Button variant="outline" size="sm" className="h-10 px-4">
              Connect
            </Button>
          </div>
        </SettingCard>

        {/* Account */}
        <SettingCard title="⚙️ Account">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Privacy Settings</h3>
              <p className="text-sm text-gray-500">
                Control your data and sharing preferences
              </p>
            </div>
            <Button variant="outline" size="sm" className="h-10 px-4">
              Manage
            </Button>
          </div>
        </SettingCard>

        {/* Order History */}
        <SettingCard title="🛍️ Order History">
          <div className="text-center py-6 text-gray-500">
            <p className="text-sm mb-4">No purchases yet</p>
            <Button variant="outline" className="h-12 px-6">
              Browse Marketplace
            </Button>
          </div>
        </SettingCard>
      </div>
    </div>
  );
};

export default ProfileScreen;

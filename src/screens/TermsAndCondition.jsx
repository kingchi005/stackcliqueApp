import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';

const TermsAndCondition = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Section title="Welcome to StackClique!">
          Prior to joining our educational platform, please carefully read and comprehend the following Terms and Conditions.{'\n'}{'\n'}By accessing and utilizing StackClique, you acknowledge your agreement to adhere to these terms. Should you disagree with any part of these terms, we request that you refrain from using our services.
        </Section>

        <Section title="1. User Accounts">
          1.1. Users must be at least 18 years old to establish an account on StackClique. For those below 18, parental or legal guardian consent is mandatory.
          {'\n'}{'\n'}1.2. It is your responsibility to safeguard the confidentiality of your account credentials and be accountable for all activities conducted under your account.
          {'\n'}{'\n'}1.3. StackClique reserves the right to suspend or terminate accounts that contravene our policies or jeopardize the integrity of the community.
        </Section>

        <Section title="2. Course Enrollment">
          2.1. Users can enroll in any course provided by StackClique at no cost.
          {'\n'}{'\n'}2.2. While all courses are free, enrolling remains essential to accessing course materials, participating in discussions, and undertaking assessments.
        </Section>

        <Section title="3. Course Content and Copyright">
          3.1. All course content, encompassing videos, text, quizzes, and assignments, is the intellectual property of StackClique or respective instructors.
          {'\n'}{'\n'}3.2. Redistribution, reproduction, modification, or exploitation of course content without prior written consent from StackClique or content owners is prohibited.
          {'\n'}{'\n'}3.3. Course materials may be utilized solely for personal, non-commercial purposes.
        </Section>

        <Section title="4. Instructor and User Interactions">
            4.1. StackClique encourages positive and respectful interactions between instructors and users within the platform.
            {'\n'}{'\n'}4.2. Users must abstain from harassment, abuse, or unauthorized solicitation of personal information from instructors or fellow users.
            {'\n'}{'\n'}4.3. Instructors are obliged to provide accurate and dependable information and content in their courses.
        </Section>

        <Section title="5. Certificates and Credentials">
            5.1. StackClique may issue certificates of completion for certain courses; however, such certificates do not constitute official academic credits or certifications unless explicitly stated otherwise.
            {'\n'}{'\n'}5.2. Users bear the responsibility of verifying the relevance and recognition of certificates in their respective fields or industries.
        </Section>

        <Section title="6. Content Reviews and Community Guidelines">
            6.1. Users are permitted to post reviews and comments on course content. These reviews should be constructive, impartial, and in alignment with our Community Guidelines.
            {'\n'}{'\n'}6.2. StackClique retains the right to remove content infringing our guidelines or deemed inappropriate.
        </Section>

        <Section title="7. Privacy and Data Protection">
            7.1. StackClique places high value on user privacy and implements measures for safeguarding personal data. Refer to our Privacy Policy for comprehensive details.
        </Section>

        <Section title="8. Disclaimer of Warranties">
            8.1. StackClique does not guarantee the accuracy, completeness, or reliability of course content or user-generated content.
            {'\n'}{'\n'}8.2. Users acknowledge their utilization of StackClique services at their own discretion and risk.
        </Section>

        <Section title="9. Modifications to Terms and Services">
            9.1. StackClique may periodically update these Terms and Conditions, and any amendments become effective upon posting on our website.
            {'\n'}{'\n'}9.2. Regularly reviewing the Terms and Conditions is the user's responsibility.
        </Section>

        <Section title="10. Governing Law and Jurisdiction">
            10.1. These Terms and Conditions are governed by and construed in accordance with the laws of Nigeria.
            {'\n'}{'\n'}10.2. Any disputes arising from these terms are subject to the exclusive jurisdiction of Nigeria's courts.
        </Section>

        <Section title="User Policy">
            Respectful Conduct: StackClique upholds a respectful and inclusive learning environment. Users are expected to treat instructors and fellow learners with courtesy and respect.

            {'\n'}{'\n'}Prohibited Activities: Engaging in illegal, harmful, or disruptive activities on StackClique, including hacking, spamming, or distributing malicious content, is strictly prohibited.

            {'\n'}{'\n'}Compliance with Laws: Users must adhere to all applicable laws and regulations while utilizing StackClique's services.

            {'\n'}{'\n'}Account Security: Users are accountable for maintaining the security of their accounts and must not share login credentials with others.

            {'\n'}{'\n'}Reporting Violations: If encountering content or behavior violating our policies or appearing inappropriate, immediate reporting to us is encouraged.
            {'\n'}{'\n'}Account Deactivation: StackClique retains the authority to deactivate or suspend user accounts violating our terms or policies.

            {'\n'}{'\n'}By utilizing StackClique, you acknowledge your compliance with these Terms and Conditions. For queries or concerns, please contact us. We appreciate your presence in StackClique's learning community.

        </Section>

        {/* Add more sections following the same pattern */}

        <Section title="About Us:">
          StackClique is an online learning platform that offers diverse courses to enhance knowledge and skills. A wide array of subjects, spanning technology, business, arts, health, and more, are freely accessible. Our aim is to create a dynamic learning space for research, skill acquisition, and student interaction.
          {'\n\n'}At StackClique, education's transformative power is embraced. We deliver interactive learning experiences via videos, quizzes, assignments, and discussions, allowing users to learn at their convenience. Expert instructors, experienced professionals in their fields, deliver engaging course content.
        </Section>

        <Section title="Leveling Up & Points:">
          Hello there! Exciting news awaits you on StackClique – a captivating feature that allows you to earn points and level up as you embark on your learning journey.{'\n'}{'\n'}Learning should feel like an adventure, so we've incorporated this gamified element to keep you motivated and engaged. Here's how it works:
          {'\n\n'}Course Completion: Every completed course earns you points. The more courses you finish, the more points you accumulate. It's like unlocking achievements along the way!
          {'\n'}{'\n'}Quizzes and Assessments: Showcase your skills by excelling in quizzes and assessments. Your performance translates to points. Better performance means more points. So, bring your best!
          {'\n'}{'\n'}Active Participation: Active involvement is appreciated! Engage in course discussions, pose questions, and share insights. Your participation garners points as we value your input.
          {'\n'}{'\n'}Peer Interaction: Aid fellow learners by answering questions and participating in constructive discussions. Sharing knowledge earns you extra points. We believe in collective learning!
          {'\n'}{'\n'}Course Reviews: Share your thoughts and experiences by reviewing completed courses. Your honest feedback assists others, and we value it. Plus, it boosts your points tally!
          {'\n'}{'\n'}Badges and Achievements: Points lead to unlocking badges and achievements – virtual trophies showcasing your progress and expertise. Take pride in your accomplishments!
          {'\n'}{'\n'}Leveling Up: With every points milestone, you level up on StackClique. It's recognition of your growth and commitment as a learner. Special perks or features might unlock as you progress. How cool is that?
          {'\n'}{'\n'}Leaderboards and Rankings: Get ready for friendly competition! We'll display leaderboards and rankings, highlighting top users based on points and levels. Shine and be recognized!
          {'\n'}{'\n'}As we value your feedback, point earning might evolve over time. Our objective is to make learning enjoyable and rewarding. Prepare for an incredible learning adventure – earn points, level up, and demonstrate your prowess on StackClique! Let's make learning an exhilarating journey together!
        </Section>
        <Section title="Take Note">
            <Text style={styles.footer}>By utilizing StackClique, you acknowledge your compliance with these Terms and Conditions. For queries or concerns, please contact us using any of the below informations.
            {'\n'}{'\n'}E-mail: <Text style={{color: '#7E0772'}}>contactstackclique@gmail.com</Text>
            {'\n'}Customer Care: <Text style={{color: '#7E0772'}}>+1 (470) 526-0343</Text>
            {'\n'}{'\n'}We appreciate your presence in StackClique's learning community.</Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: '#7E0772' }]}>{title}</Text>
    <Text style={styles.sectionText}>{children}</Text>
  </View>
);

export default TermsAndCondition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  section: {
    marginTop: 20,
    bottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 15,
    color: 'grey',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  footer: {
    fontSize: 14,
    color: 'grey',
    lineHeight: 20,
    marginTop: 10,
  },
});

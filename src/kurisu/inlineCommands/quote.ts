import { InlineCommand } from '..';

const quote: InlineCommand = async () => {
  const quotes = [
    'Something must be wrong for you to use my actual name.',
    'Say it right, Hououin Pervert-Kyouma!',
    'Who\'ll eat a pervert\'s banana anyway?',
    '99.9% of science is boring.'
  ];
  return quotes.map(quote => ({
    title: quote,
    message: quote,
    cache: 1000,
  }));
};

export default quote;

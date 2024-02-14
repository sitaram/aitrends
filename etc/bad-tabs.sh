# redis-cli keys '*Below*' > /tmp/keys

# >/tmp/vals; cat /tmp/keys | while read -r rediskey; do echo KEY: $rediskey >>/tmp/vals; redis-cli GET "$rediskey" >>/tmp/vals; done

(cat /tmp/vals; echo "KEY: dummy") | sed 's/KEY:/\n&/g' |

perl -lne '

my @x = (
'"$(awk -F\' '{print $2}' app/tabs.js | grep -v Divider | grep .)"'
);
%tab = ();
foreach (@x) {
$tab{$_} = 1;
}

while (<>) {
chomp;
if (/^KEY: (.*)/) {
 if ($key) {
 $val =~ s/\[\[(.*?)\]\]/\nTAB: $1\n/g;
 my $n = 0;
 foreach (split(/\n/, $val)) {
   if (/TAB: (.*)/ && !$tab{$1}) {print "# $_"; $n++;}
 }
 print "redis-cli DEL \"$key\"" if $n;
 print "" if $n;
 }
 $key = $1;
 $val = "";
} else {
  $val = $val . $_;
}
}

' | tee bad-tabs-del-cmd


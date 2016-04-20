Pod::Spec.new do |s|
  s.name         = "RCTOrientation"
  s.version      = "1.15.0"
  s.summary      = "Listen to device orientation changes in react-native."
  s.requires_arc = true
  s.author       = { 'Yamill Vallecillo' => 'yamill@gmail.com' }
  s.homepage     = 'https://github.com/xinthink/react-native-material-kit'
  s.source       = { :git => "https://github.com/yamill/react-native-orientation.git" }
  s.source_files = 'RCTOrientation/*'
  s.platform     = :ios, "7.0"
  s.dependency 'React'
end

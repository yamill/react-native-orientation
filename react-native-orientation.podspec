require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = package['name']
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { :git => 'https://github.com/yamill/react-native-orientation.git', :tag => s.version }

  s.requires_arc   = true
  s.platform       = :ios, '7.0'

  s.preserve_paths = 'README.md', 'package.json', 'index.js'
  s.source_files   = 'iOS/RCTOrientation/*.{h,m}'

  s.dependency 'React'
end